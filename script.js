document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.navitem');
    navItems.forEach(function(navItem) {
        navItem.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior

            const targetPage = this.getAttribute('href'); // Get the href attribute value

            // Simulate navigation by setting window.location
            window.location.href = targetPage;

            // Optional: Add any additional logic here if needed
            // For example, you might want to highlight the active link
            navItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const form = document.getElementById('UTM');
    const utmoutputDiv = document.getElementById('utmoutput');
    const copyButton = document.getElementById('copybutton');
    const confirmationLabel = document.createElement('p');
    confirmationLabel.className = 'confirmation-label';
    outputsection.appendChild(confirmationLabel);

    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission
        
        const name = form.elements['name'].value.trim();
        const date = form.elements['date'].value;
        const product = form.elements['product'].value;
        const source = form.elements['source'].value;
        const medium = form.elements['medium'].value;

        if (!date) {
            confirmationLabel.textContent = "Please select a date.";
            setTimeout(function () {
                confirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (product === "") {
            confirmationLabel.textContent = "Please select a product.";
            setTimeout(function () {
                confirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (source === "") {
            confirmationLabel.textContent = "Please select a source.";
            setTimeout(function () {
                confirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (medium === "") {
            confirmationLabel.textContent = "Please select a medium.";
            setTimeout(function () {
                confirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        const dateFormatted = date.split('-').reverse().join('');
        let generatedString = `?utm_campaign=${dateFormatted}-${source}-${product}&utm_medium=${medium}&utm_source=${source}`;
        
        if (name) {
            generatedString = `?utm_campaign=${dateFormatted}-${source}-${name}-${product}&utm_medium=${medium}&utm_source=${source}`;
        }

        utmoutputDiv.textContent = generatedString;
        copyButton.disabled = false;
    });

    copyButton.addEventListener('click', function () {
        const generatedString = utmoutputDiv.textContent;

        navigator.clipboard.writeText(generatedString).then(function () {
            confirmationLabel.textContent = "UTM copied to clipboard";
        }).catch(function (err) {
            confirmationLabel.textContent = "Failed to copy UTM";
        });

        setTimeout(function () {
            confirmationLabel.textContent = '';
        }, 5000);
    });

    const keyform = document.getElementById('keyclean');
    const keyoutputDiv = document.getElementById('keyoutput');
    const keycopyButton = document.getElementById('keycopybutton');
    const keyconfirmationLabel = document.createElement('p');
    keyconfirmationLabel.className = 'confirmation-label';
    keywordoutputsection.appendChild(confirmationLabel);

    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission
        
        const keywords = form.elements['fullkeywords'].value.trim();

        if (!keywords) {
            confirmationLabel.textContent = "Please add keywords.";
            setTimeout(function () {
                confirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (keywords) {
            generatedString = keywords;
        }

        keyoutputDiv.textContent = generatedString;
        copyButton.disabled = false;
    });

    keycopyButton.addEventListener('click', function () {
        const generatedString = keyutmoutputDiv.textContent;

        navigator.clipboard.writeText(generatedString).then(function () {
            confirmationLabel.textContent = "List copied to clipboard";
        }).catch(function (err) {
            confirmationLabel.textContent = "Failed to copy List";
        });

        setTimeout(function () {
            confirmationLabel.textContent = '';
        }, 5000);
    });
});