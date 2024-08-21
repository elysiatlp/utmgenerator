document.addEventListener('DOMContentLoaded', function () {
    // Function to replace keywords with asterisks
    function replaceKeywords(text) {
        const replacements = ["Manage", "Admin", "Lead", "Analy", "Direct", "Engineer", "Develop", "Teach", "Assist", "Program", "Consult", "Hack", "Tech", "Test", "Science"];
        let result = text;
        replacements.forEach(keyword => {
            result = result.replace(new RegExp(keyword, 'g'), keyword + '*');
        });
        return result;
    }

    // Function to remove characters between "*" and " " or "*" and ","
    function removeCharacters(text) {
        return text.replace(/\*(.*?)\s|\*(.*?)(?=[,])/g, '*, ');
    }

    // Function to remove duplicate keywords while preserving order
    function removeDuplicates(text) {
        let keywords = text.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
        let uniqueKeywords = [...new Set(keywords)];
        return uniqueKeywords.join(', ');
    }

    const keyform = document.getElementById('keyclean');
    const keyoutputDiv = document.getElementById('keyoutput');
    const keycopyButton = document.getElementById('keycopybutton');
    const keywordoutputsection = document.getElementById('keywordoutputsection'); 
    const keyconfirmationLabel = document.createElement('p');
    keyconfirmationLabel.className = 'confirmation-label';
    keywordoutputsection.appendChild(keyconfirmationLabel);

    keyform.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission

        const keywords = keyform.elements['fullkeywords'].value.trim();

        if (keywords === "") {
            keyconfirmationLabel.textContent = "Please enter keywords.";
            setTimeout(function () {
                keyconfirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        let replacedString = replaceKeywords(keywords);
        replacedString = removeCharacters(replacedString);
        replacedString = removeDuplicates(replacedString);

        const length = replacedString.split(',').length;

        keyoutputDiv.textContent = `Your keyword list is: ${replacedString}. The length is: ${length}`;

        keycopyButton.disabled = false;
    });

    keycopyButton.addEventListener('click', function () {
        const generatedString = keyoutputDiv.textContent;

        navigator.clipboard.writeText(generatedString).then(function () {
            keyconfirmationLabel.textContent = "List copied to clipboard";
        }).catch(function (err) {
            keyconfirmationLabel.textContent = "Failed to copy List";
        });

        setTimeout(function () {
            keyconfirmationLabel.textContent = '';
        }, 5000);
    });
});
