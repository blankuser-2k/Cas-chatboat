function sendMessage() {
    const inputBox = document.getElementById("userInput");
    const chatBox = document.getElementById("chatbox");
    const userMessage = inputBox.value.toLowerCase();

    if (!userMessage.trim()) return;

    chatBox.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;
    inputBox.value = "";

    let botReply = "Sorry, I don't understand. Please ask something about the college.";

    if (userMessage.includes("time") || userMessage.includes("timing")) {
        botReply = "College time is 9:30 AM to 3:45 PM.";
    }

    else if (userMessage.includes("address") || userMessage.includes("location")) {
        botReply = "College Address: The Principal, College of Applied Science, Vattamkulam, Nellissery, Sukapuram (P.O.), Edappal, Malappuram, Kerala, PIN - 679576.";
    }

    else if (userMessage.includes("phone") || userMessage.includes("contact")) {
        botReply = "Phone: 0494 2689655";
    }

    else if (userMessage.includes("email") || userMessage.includes("mail")) {
        botReply = "Email: casvattamkulam@ihrd.ac.in";
    }

    else if (userMessage.includes("course") || userMessage.includes("courses")) {
        botReply = "Courses: B.Sc CS, B.Sc Electronics, BCA, B.Com CA, M.Sc CS, M.Com Finance.";
    }

    else if (userMessage.includes("more") || userMessage.includes("about")) {
        botReply = "CAS Vattamkulam, established in 2005 by IHRD, is 3 km near Edappal. Affiliated with Calicut University offering UG & PG programs.";
    }

    chatBox.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}