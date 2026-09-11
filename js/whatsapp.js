/* =========================================
   VOLTA - WHATSAPP ORDERS
========================================= */

const WHATSAPP_NUMBER = "201012087282";


/* =========================================
   SEND ORDER TO WHATSAPP
========================================= */

function sendOrderToWhatsApp() {

    const cart =
        JSON.parse(localStorage.getItem("voltaCart")) || [];

    const noteInput =
        document.getElementById("orderNote");

    const note =
        noteInput ? noteInput.value.trim() : "";


    /* -----------------------------------------
       Check Cart + Note
    ----------------------------------------- */

    if (cart.length === 0 && !note) {

        if (typeof showToast === "function") {
            showToast("السلة فارغة ولم تتم إضافة أي ملاحظة");
        }

        return;
    }


    /* -----------------------------------------
       Date & Time
    ----------------------------------------- */

    const now = new Date();

    const date = now.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    const time = now.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit"
    });


    /* -----------------------------------------
       Section
    ----------------------------------------- */

    let section = "غير محدد";

    if (typeof window.getSelectedCafeSection === "function") {

        section =
            window.getSelectedCafeSection();

    } else {

        const activeSection =
            document.querySelector(
                ".sub-section-card.active"
            );

        if (activeSection) {
            section =
                activeSection.dataset.section ||
                "غير محدد";
        }

    }


    /* -----------------------------------------
       Total Quantity
    ----------------------------------------- */

    const totalQuantity = cart.reduce(
        (total, item) => {
            return total + Number(item.quantity || 0);
        },
        0
    );


    /* -----------------------------------------
       Build Products
    ----------------------------------------- */

    let productsText = "";

    if (cart.length > 0) {

        productsText =
            cart.map((item, index) => {

                return (
                    `${index + 1}️⃣ *${item.name}*\n` +
                    `   الكمية: ${item.quantity} ${item.unit}`
                );

            }).join("\n\n");

    } else {

        productsText =
            "لا توجد منتجات مضافة للسلة.";

    }


    /* -----------------------------------------
       Final Message
    ----------------------------------------- */

    let message = `

🟦 *ڤولتا | VOLTA*

🛒 *طلب توريد جديد*
━━━━━━━━━━━━━━━━━━

📍 *القسم:* ${section}

📅 *التاريخ:* ${date}
⏰ *الوقت:* ${time}

📦 *المنتجات المطلوبة:*

${productsText}

━━━━━━━━━━━━━━━━━━
📊 *إجمالي الكميات:* ${totalQuantity}
`;


    /* -----------------------------------------
       Note
    ----------------------------------------- */

    if (note) {

        message += `

📝 *ملاحظات إضافية:*
${note}
`;

    }


    message += `

━━━━━━━━━━━━━━━━━━
✅ *تم إرسال الطلب عبر نظام Volta*
`;


    /* -----------------------------------------
       WhatsApp URL
    ----------------------------------------- */

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =========================================
   SEND BUTTON
========================================= */

const sendOrderButton =
    document.getElementById("sendOrder");


if (sendOrderButton) {

    sendOrderButton.addEventListener(
        "click",
        sendOrderToWhatsApp
    );

}