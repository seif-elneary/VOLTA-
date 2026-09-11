/* =========================================
   VOLTA - PRICES WHATSAPP
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    const pricesForm = document.getElementById("pricesForm");
    const priceDetails = document.getElementById("priceDetails");

    if (!pricesForm) {
        console.error("pricesForm not found");
        return;
    }

    pricesForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const selectedSection = document.querySelector(
            'input[name="priceSection"]:checked'
        );

        if (!selectedSection) {
            alert("من فضلك اختر القسم أولاً");
            return;
        }

        if (!priceDetails || !priceDetails.value.trim()) {
            alert("من فضلك اكتب الأسعار أو الرسالة أولاً");

            if (priceDetails) {
                priceDetails.focus();
            }

            return;
        }

        const section = selectedSection.value;
        const details = priceDetails.value.trim();

        const now = new Date();

        const date = now.toLocaleDateString("ar-EG");

        const time = now.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit"
        });

        const message =
            `💰 تحديث أسعار - ڤولتا

📌 القسم: ${section}

━━━━━━━━━━━━━━━━━━

${details}

━━━━━━━━━━━━━━━━━━

📅 التاريخ: ${date}
⏰ الوقت: ${time}`;

        const phone = "201012087282";

        const whatsappURL =
            "https://wa.me/" +
            phone +
            "?text=" +
            encodeURIComponent(message);

        console.log("WhatsApp URL:", whatsappURL);

        window.location.href = whatsappURL;

    });

});