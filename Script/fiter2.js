var counter = 1; // Counter for unique labels and names

  function addTextField() {      // function for add room
    // Create a new text field
    var textField = document.createElement("input");
    textField.setAttribute("type", "text");
    textField.classList.add('login__add__text');

    // Create a unique label and name
    var label = document.createElement("label");
    label.innerHTML = "Room number " + " : ";
    var name = "Room number" + counter;

    // Set name and id attribute for the text field
    textField.setAttribute("name", name);
    textField.setAttribute("id", name);

    // Append the label and text field to the form
    var form = document.getElementById("myForm");
    form.appendChild(label);
    form.appendChild(textField);
   // form.appendChild(document.createElement("br")); // Add line break

    //////////////////////////////////////////////////


     // Create a new text field
     var textField = document.createElement("input");
     textField.setAttribute("type", "text");
     textField.classList.add('login__add__text');
 
     // Create a unique label and name
     var label = document.createElement("label");
     label.innerHTML = "Room name " + " : ";
     var name = "Room name" + counter;
 
     // Set name and id attribute for the text field
     textField.setAttribute("name", name);
     textField.setAttribute("id", name);
 
     // Append the label and text field to the form
     var form = document.getElementById("myForm");
     form.appendChild(label);
     form.appendChild(textField);
     form.appendChild(document.createElement("br")); // Add line break
     form.appendChild(document.createElement("br"));
     form.appendChild(document.createElement("br"));
 
    // Increment the counter for the next label and name
    counter++;
  }



// for add window ------------------------------



var count = 1; // Counter for unique labels and names

  function addTextFieldforwindow() {      // function for add window
    // Create a new text field
    var textField = document.createElement("input");
    textField.setAttribute("type", "text");
    textField.classList.add('login__add__text');

    // Create a unique label and name
    var label = document.createElement("label");
    label.innerHTML = "Width (inch) " + " : ";
    var name = "Width" + count;

    // Set name and id attribute for the text field
    textField.setAttribute("name", name);
    textField.setAttribute("id", name);

    // Append the label and text field to the form
    var form = document.getElementById("myForm");
    form.appendChild(label);
    form.appendChild(textField);

    //////////////////////////////////////////////////


     // Create a new text field
     var textField = document.createElement("input");
     textField.setAttribute("type", "text");
     textField.classList.add('login__add__text');
 
     // Create a unique label and name
     var label = document.createElement("label");
     label.innerHTML = "Height (inch) " + " : ";
     var name = "Height" + count;
 
     // Set name and id attribute for the text field
     textField.setAttribute("name", name);
     textField.setAttribute("id", name);
 
     // Append the label and text field to the form
     var form = document.getElementById("myForm");
     form.appendChild(label);
     form.appendChild(textField);
     form.appendChild(document.createElement("br")); // Add line break
 
     /////////////////////////////////////////

     var textField = document.createElement("input");
     textField.setAttribute("type", "text");
     textField.classList.add('login__add__text');
 
     // Create a unique label and name
     var label = document.createElement("label");
     label.innerHTML = "Type of curtain " + " : ";
     var name = "Type of curtain" + count;
 
     // Set name and id attribute for the text field
     textField.setAttribute("name", name);
     textField.setAttribute("id", name);
 
     // Append the label and text field to the form
     var form = document.getElementById("myForm");
     form.appendChild(label);
     form.appendChild(textField);
     form.appendChild(document.createElement("br"));
 

     //////////////////////////////////////////////////
 
 
      // Create a new text field
      var textField = document.createElement("input");
      textField.setAttribute("type", "text");
      textField.classList.add('login__add__text');
  
      // Create a unique label and name
      var label = document.createElement("label");
      label.innerHTML = "Fabric " + " : ";
      var name = "Fabric" + count;
  
      // Set name and id attribute for the text field
      textField.setAttribute("name", name);
      textField.setAttribute("id", name);
  
      // Append the label and text field to the form
      var form = document.getElementById("myForm");
      form.appendChild(label);
      form.appendChild(textField);

      
      ///////////////////////////////////////


      // Create a new text field
      var textField = document.createElement("input");
      textField.setAttribute("type", "text");
      textField.classList.add('login__add__text');
  
      // Create a unique label and name
      var label = document.createElement("label");
      label.innerHTML = "Fabric req (meter) " + " : ";
      var name = "Fabric req" + count;
  
      // Set name and id attribute for the text field
      textField.setAttribute("name", name);
      textField.setAttribute("id", name);
  
      // Append the label and text field to the form
      var form = document.getElementById("myForm");
      form.appendChild(label);
      form.appendChild(textField);
      form.appendChild(document.createElement("br"));
    

      ///////////////////////////////////


       // Create a new text field
       var textField = document.createElement("input");
       textField.setAttribute("type", "text");
       textField.classList.add('login__add__text');
   
       // Create a unique label and name
       var label = document.createElement("label");
       label.innerHTML = "Blackout " + " : ";
       var name = "Blackout" + count;
   
       // Set name and id attribute for the text field
       textField.setAttribute("name", name);
       textField.setAttribute("id", name);
   
       // Append the label and text field to the form
       var form = document.getElementById("myForm");
       form.appendChild(label);
       form.appendChild(textField);


       ///////////////////////////////////////


        // Create a new text field
      var textField = document.createElement("input");
      textField.setAttribute("type", "text");
      textField.classList.add('login__add__text');
  
      // Create a unique label and name
      var label = document.createElement("label");
      label.innerHTML = "Blackout req (meter) " + " : ";
      var name = "Blackout req" + count;
  
      // Set name and id attribute for the text field
      textField.setAttribute("name", name);
      textField.setAttribute("id", name);
  
      // Append the label and text field to the form
      var form = document.getElementById("myForm");
      form.appendChild(label);
      form.appendChild(textField);
      form.appendChild(document.createElement("br"));
      form.appendChild(document.createElement("br"));
      form.appendChild(document.createElement("br"));
 

    // Increment the counter for the next label and name
    count++;
  }

