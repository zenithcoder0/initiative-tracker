let initiativeArray = []; // Array to store character initiatives

function addInitiative() {
    const name = document.getElementById("name").value.trim();
    const modifier = parseInt(document.getElementById("modifier").value);
    const manualInitiative = parseInt(document.getElementById("manual-initiative").value);
    let initiative;
    
    if(modifier) {
        initiative = rollInitiative() + modifier;
    } else {
        initiative = manualInitiative;
    }
    if (name === "") {
        alert("Please enter name.");
        return;
    }

    if (!initiative) {
        alert("Please enter intitiative or modifier.");
        return;
    }
    

    if (modifier && manualInitiative) {
        alert("You cannot have a modifier with a manual initiative. Try again.");
        return;
    }

    // Add character to initiative list
    // initiativeArray.push({ name, initiative, modifier, original, manualInitiative});
    initiativeArray.push({ name, initiative});

    // Sort array by initiative (descending)
    initiativeArray.sort((a, b) => b.initiative - a.initiative);

    // Display the updated initiative order
    displayInitiative();

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("manual-initiative").value = "";
    document.getElementById("modifier").value = "";
}

function addMultiInitiative() {
    const name = document.getElementById("multi-name").value.trim();
    const modifier = parseInt(document.getElementById("multi-modifier").value);
    const manualInitiative = parseInt(document.getElementById("multi-manual-initiative").value);
    const count = parseInt(document.getElementById("multi-count").value);
    let initiative;
    
    if(modifier) {
        initiative = rollInitiative() + modifier;
    } else {
        initiative = manualInitiative;
    }
    if (name === "") {
        alert("Please enter name.");
        return;
    }

    if (!initiative) {
        alert("Please enter intitiative or modifier.");
        return;
    }
    

    if (modifier && manualInitiative) {
        alert("You cannot have a modifier with a manual initiative. Try again.");
        return;
    }

        // Find the highest existing numbered instance of this name
        let existingGobbieNumbers = initiativeArray
        .filter(char => char.name.startsWith(name))
        .map(char => {
            const match = char.name.match(/\d+$/);
            return match ? parseInt(match[0]) : 0;
        });

    let nextNumber = existingGobbieNumbers.length > 0 
        ? Math.max(...existingGobbieNumbers) + 1 
        : 1;

    for (let i = 0; i < count; i++) {  
        let initiative;
        if (modifier) {
            initiative = rollInitiative() + modifier; // Roll initiative and apply modifier
        } else {
            initiative = manualInitiative; // Use manual initiative if provided
        }

        // Ensure every Gobbie is numbered
        let instanceName = `${name} ${nextNumber + i}`;
        initiativeArray.push({ name: instanceName, initiative });
    }

    // Sort array by initiative (descending)
    initiativeArray.sort((a, b) => b.initiative - a.initiative);

    // Display the updated initiative order
    displayInitiative();

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("manual-initiative").value = "";
    document.getElementById("modifier").value = "";
}

function displayInitiative() {
    const list = document.getElementById("initiative-list");
    list.innerHTML = ""; // Clear previous entries
    initiativeArray.forEach(entry => {
        const divItem = document.createElement("div"); // Create a div instead of a list item
        divItem.textContent = `${entry.manualInitiative || entry.initiative}: ${entry.name}`;
        list.appendChild(divItem);
    });
}

function rollInitiative() {
    return Math.floor(Math.random() * 20) + 1;
}

function clearInitiative() {
    initiativeArray = [];  // Completely clear the initiative list
    displayInitiative();   // Update the UI to show an empty list
}
