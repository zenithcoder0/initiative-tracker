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
