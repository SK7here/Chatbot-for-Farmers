'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

//initialise the database
const admin = require('firebase-admin');
admin.initializeApp({
credential: admin.credential.applicationDefault(),
databaseURL: 'https://fnplus-chatbot.firebaseio.com/',
});

var count=0;
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) 
  {
    agent.add(`Welcome to my agent!`);
    agent.add("how can i help you?");
    agent.add(new Suggestion("crop"));
  }
 
  function fallback(agent) 
  {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  } 

  function disfunc(agent)
  {  
    agent.add(new Suggestion(`Millet`));
    agent.add(new Suggestion('Gooseberry'));
    agent.add(new Suggestion(`Onion`));
    agent.add("Please choose the plant"); 
    agent.add(new Suggestion("menu"));
  }




  function Milletfunc(agent)
  {
   	agent.add("Select a disease related to Millets");
    agent.add(new Suggestion(`Kernel smut`));
    agent.add(new Suggestion(`Ergot`));
    agent.add(new Suggestion(`Rust`));
    agent.add(new Suggestion("menu"));
    agent.add(new Suggestion("crop"));
  }




  function Kernel_smutfunc(agent)
  {
    return admin.database().ref('disease/millet/kernelsmut').once("value").then((snapshot) => 
    {
      var desc = snapshot.child("desc").val();
      agent.add(desc);
   
      agent.add(new Suggestion("menu"));
      agent.add(new Suggestion("crop"));
    });
  }
 

 function menufunc(agent)
 {
   	 agent.add("Get to know about precautions for diseases related to various crops OR Get to know about details related to various loans");
     agent.add(new Suggestion("crop"));
   	 agent.add(new Suggestion("loan"));
 }


 function  Gooseberryfunc(agent)
 {
   	agent.add("Select a disease related to Gooseberry");
    agent.add(new Suggestion("Mildew Sphaerotheca"));
    agent.add(new Suggestion("Anthracnose"));
    agent.add(new Suggestion("Stinkbugs"));
    agent.add(new Suggestion("menu"));
    agent.add(new Suggestion("crop"));
 }


 function MildewSphaerothecafunc(agent)
 {
	return admin.database().ref('disease/gooseberry/MildewSphaerotheca').once("value").then((snapshot) => 
  {
      var desc = snapshot.child("desc").val();
      agent.add(desc);
    
      agent.add(new Suggestion("menu"));
      agent.add(new Suggestion("crop"));
  });
 }


 function Onionfunc(agent)
 {
     agent.add("Select a disease related to Onion");
     agent.add(new Suggestion("Neck rot"));
     agent.add(new Suggestion("Smudge"));
     agent.add(new Suggestion("Soft rot"));
     agent.add(new Suggestion("menu"));
     agent.add(new Suggestion("crop"));     
 }


 function Neck_rotfunc(agent)
 {

   return admin.database().ref('disease/onion/neckrot').once("value").then((snapshot) => 
   {
      var desc = snapshot.child("desc").val();
      agent.add(desc);
      agent.add(new Suggestion("menu"));
      agent.add(new Suggestion("crop"));
    });
 }


  function Smudgefunc(agent)
  {
    return admin.database().ref('disease/onion/smudge').once("value").then((snapshot) => 
    {
        var desc = snapshot.child("desc").val();
        agent.add(desc);
        agent.add(new Suggestion("menu"));
        agent.add(new Suggestion("crop"));
    });       
  }


  function Soft_rotfunc(agent)
  {
      return admin.database().ref('disease/onion/softrot').once("value").then((snapshot) =>
      {
        var desc = snapshot.child("desc").val();
        agent.add(desc);
        agent.add(new Suggestion("menu"));
        agent.add(new Suggestion("crop"));
      });
       
  }
  
  
  function anthracnosefunc(agent)
  {
      return admin.database().ref('disease/gooseberry/Anthracnose').once("value").then((snapshot) =>
      {
        var desc = snapshot.child("desc").val();
        agent.add(desc);
        agent.add(new Suggestion("menu"));
        agent.add(new Suggestion("crop"));
      });
       
  }


  function stinkbugsfunc(agent)
  {
      return admin.database().ref('disease/gooseberry/Stinkbugs').once("value").then((snapshot) =>
      {
        var desc = snapshot.child("desc").val();
        agent.add(desc);
        agent.add(new Suggestion("menu"));
        agent.add(new Suggestion("crop"));
      });
 
  }


  function ergotfunc(agent)
  {
      return admin.database().ref('disease/millet/Ergot').once("value").then((snapshot) =>
      {
        var desc = snapshot.child("desc").val();
        agent.add(desc);
        agent.add(new Suggestion("menu"));
        agent.add(new Suggestion("crop"));
      });
 
  }


  function rustfunc(agent)
  {
    return admin.database().ref('disease/millet/Rust').once("value").then((snapshot) =>
    {
      var desc = snapshot.child("desc").val();
      agent.add(desc);
      agent.add(new Suggestion("menu"));
      agent.add(new Suggestion("crop"));
    });

  }
  

  let conv = agent.conv;

  
  function updatefunc(agent)
  {
    const email=agent.parameters.email;
    const password=agent.parameters.password;
    if(email=="kailash.s1998@gmail.com" && password=="sk7")
    {
        count=1;
        agent.add("Login success!!!");
        sugession(agent);
    }
    else
    {
        agent.add("invalid details. Please try again");
        agent.add(new Suggestion("Login"));
    }   
  }

  
  function logout_func(agent)
  {
    count=0;
    agent.add("Logout Success!!!");
    agent.add(new Suggestion("Login"));
    agent.add(new Suggestion("menu"));
  }


  function sugession(agent)
  {
    agent.add(new Suggestion('update kernelsmut'));
    agent.add(new Suggestion('update anthracnose'));
    agent.add(new Suggestion('update Mildew Sphaerotheca'));
    agent.add(new Suggestion('update neck rot'));
    agent.add(new Suggestion('update soft rot'));
    agent.add(new Suggestion('update smudge'));
    agent.add(new Suggestion('update stinkbugs'));
    agent.add(new Suggestion('update ergot'));
    agent.add(new Suggestion('update rust'));
    agent.add(new Suggestion('Logout')); 
  } 

  
  function updatekernelsmutfunc(agent)
  {
    if(count==1)
    {
      agent.add("New details of kernelsmut:");
      const desc=agent.parameters.new_kernelsmut;
      agent.add(desc);
      admin.database().ref('disease/millet/kernelsmut').set({desc:desc});
      agent.add("successfully updated!!!");
      sugession(agent);
    }
   else
   {
       agent.add("Login failed!!! Please login to continue");
       agent.add(new Suggestion("Login"));
   }
  }
  

  function updatemildewfunc(agent)
  {
   if(count==1)
   {
     const desc=agent.parameters.new_mildew;
     agent.add("New details of Mildew Sphaerotheca:");
  	 admin.database().ref('disease/gooseberry/MildewSphaerotheca').set({desc:desc});
     agent.add(desc);
     agent.add("successfully updated!!!");
     sugession(agent);
    }
   else
   {
      agent.add("Login failed!!! Please login to continue");
      agent.add(new Suggestion("Login"));
   }
 } 


 function updateneckrotfunc(agent)
 {
   if(count==1)
   {
      const desc=agent.parameters.new_neckrot;
      agent.add("New details of Neckrot:");
      admin.database().ref('disease/onion/neckrot').set({desc:desc});
      agent.add(desc);
      agent.add("successfully updated!!!");
      sugession(agent);
    }
   else
   {
      agent.add("Login failed!!! Please login to continue");
      agent.add(new Suggestion("Login"));
   }
 }


 function updatesoftrotfunc(agent)
 {
   if(count==1)
   {
      const desc=agent.parameters.new_softrot;
      agent.add("New details of Softrot:");
      admin.database().ref('disease/onion/softrot').set({desc:desc});
      agent.add(desc);
      agent.add("successfully updated!!!");
      sugession(agent);
    }

   else
    {
      agent.add("Login failed!!! Please login to continue");
      agent.add(new Suggestion("Login"));
    }
}



 function updatesmudgefunc(agent)
 {
    if(count==1)
    {
      const desc=agent.parameters.new_softrot;
      agent.add("New details of Smudge:");
      admin.database().ref('disease/onion/smudge').set({desc:desc});
      agent.add(desc);
      agent.add("successfully updated!!!");
      sugession(agent);
    }
    else
    {
       agent.add("Login failed!!! Please login to continue");
       agent.add(new Suggestion("Login"));
    }
  }


 function updateanthracnosefunc(agent)
 {
    if(count==1)
    {
      const desc=agent.parameters.new_anthracnose;
      agent.add("New details of Anthracnose:");
      admin.database().ref('disease/gooseberry/Anthracnose').set({desc:desc});
      agent.add(desc);
      agent.add("successfully updated!!!");
      sugession(agent);
    }
    else
    {
       agent.add("Login failed!!! Please login to continue");
       agent.add(new Suggestion("Login"));
    }
  }


 function updatestinkbugsfunc(agent)
 {
    if(count==1)
    {
      const desc=agent.parameters.new_stinkbugs;
      agent.add("New details of Stinkbugs:");
      admin.database().ref('disease/gooseberry/Stinkbugs').set({desc:desc});
      agent.add(desc);
      agent.add("successfully updated!!!");
      sugession(agent);
    }
    else
    {
       agent.add("Login failed!!! Please login to continue");
       agent.add(new Suggestion("Login"));
    }
  }


 function updateergotfunc(agent)
 {
    if(count==1)
    {
      const desc=agent.parameters.new_ergot;
      agent.add("New details of Ergot:");
      admin.database().ref('disease/millet/Ergot').set({desc:desc});
      agent.add(desc);
      agent.add("successfully updated!!!");
      sugession(agent);
    }
    else
    {
       agent.add("Login failed!!! Please login to continue");
       agent.add(new Suggestion("Login"));
    }
  }


 function updaterustfunc(agent)
 {
    if(count==1)
    {
      const desc=agent.parameters.new_rust;
      agent.add("New details of Rust:");
      admin.database().ref('disease/millet/Rust').set({desc:desc});
      agent.add(desc);
      agent.add("successfully updated!!!");
      sugession(agent);
    }
    else
    {
       agent.add("Login failed!!! Please login to continue");
       agent.add(new Suggestion("Login"));
    }
 }

  

  
  function axis_bank_func(agent)
  {
     agent.add("Select the loan for which you need the details");
     agent.add(new Suggestion("education loan"));
     agent.add(new Suggestion("car loan"));
     agent.add(new Suggestion("agricultural loan"));
     agent.add(new Suggestion("personal loan"));
     agent.add(new Suggestion("home loan"));
     agent.add(new Suggestion("business loan"));
     agent.add(new Suggestion("Agriculture loan"));
     agent.add(new Suggestion(" loan"));
     agent.add(new Suggestion("menu"));
   
  }


  
  
    function car_loan_func(agent)
    {
      return admin.database().ref('axis bank/loan/car loan/').once("value").then((snapshot) => 
      {
        var desc = snapshot.child("desc").val();
        var link = snapshot.child("link").val();
        agent.add("Description: "+desc+"\n\n"+"Link: "+link);      
        agent.add(new Suggestion("personal loan"));
        agent.add(new Suggestion("home loan"));
        agent.add(new Suggestion("business loan"));
        agent.add(new Suggestion("menu"));
        agent.add(new Suggestion("loan"));
      }); 
    }
 
 


    function home_loan_func(agent)
    {
     return admin.database().ref('axis bank/loan/home loan/').once("value").then((snapshot) =>
      {
       
       var desc = snapshot.child("desc").val();
       var link = snapshot.child("link").val();
       agent.add("Description: "+desc+"\n\n"+"Link: "+link);      
 
       
       agent.add(new Suggestion("personal loan"));
       agent.add(new Suggestion("business loan"));
       agent.add(new Suggestion("menu"));
       agent.add(new Suggestion("loan"));
      }); 
    }




    function business_loan_func(agent)
    {
     return admin.database().ref('axis bank/loan/business loan/').once("value").then((snapshot) => 
     {
         
      var desc = snapshot.child("desc").val();
      var link = snapshot.child("link").val();
      agent.add("Description: "+desc+"\n\n"+"Link: "+link);      
 
       
      agent.add(new Suggestion("menu"));
      agent.add(new Suggestion("loan"));
      }); 
    }
  



    function horti_func(agent)
    {
     return admin.database().ref('axis bank/loan/agriculture loan/horticulture').once("value").then((snapshot) =>
     {
         
       var desc = snapshot.child("desc:").val();
       var link = snapshot.child("link:").val();
       agent.add("Description: "+desc+"\n\n"+"Link: "+link);      
 
       
       agent.add(new Suggestion("menu"));
       agent.add(new Suggestion("loan"));
      }); 
    }
  



    function agri_func(agent)
    {  
       agent.add("Select an agricultural loan to get the details");      
 
       agent.add(new Suggestion("Horticulture"));
       agent.add(new Suggestion("tractor loan"));
    }
  
    function tractor_func(agent)
    {
     return admin.database().ref('axis bank/loan/agriculture loan/tractor').once("value").then((snapshot) => 
     {
         
        var desc = snapshot.child("desc:").val();
        var link = snapshot.child("link:").val();
        agent.add("Description: "+desc+"\n\n"+"Link: "+link);      
 
       
        agent.add(new Suggestion("menu"));
        agent.add(new Suggestion("loan"));
      });
    }


  
  
    function education_loan_func(agent)
    {
      return admin.database().ref('axis bank/loan/education loan/').once("value").then((snapshot) => 
      {
      
        var desc = snapshot.child("desc").val();
        var link = snapshot.child("link").val();
        agent.add("Description: "+desc+"\n\n"+"Link: "+link);      
       
        agent.add(new Suggestion("car loan"));
        agent.add(new Suggestion("menu"));
        agent.add(new Suggestion("loan"));
      });
    }



  
    function personal_loan_func(agent)
    {
      return admin.database().ref('axis bank/loan/personal loan/').once("value").then((snapshot) => 
      {
          
        var desc = snapshot.child("desc").val();
        var link = snapshot.child("link").val();
        agent.add("Description: "+desc+"\n\n"+"Link: "+link);      

         
        agent.add(new Suggestion("education loan"));
        agent.add(new Suggestion("menu"));
        agent.add(new Suggestion("loan"));
      });
    }



  
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name




  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('crop', disfunc);

  intentMap.set('Millet', Milletfunc);    
  intentMap.set('Kernel smut', Kernel_smutfunc);
  intentMap.set('menu', menufunc);
  intentMap.set('Gooseberry', Gooseberryfunc);
  intentMap.set('Mildew Sphaerotheca', MildewSphaerothecafunc);
  intentMap.set('Onion', Onionfunc);
  intentMap.set('Neck rot', Neck_rotfunc);
  intentMap.set('Smudge', Smudgefunc);
  intentMap.set('Soft rot', Soft_rotfunc);
  intentMap.set('Anthracnose', anthracnosefunc);
  intentMap.set('Stinkbugs', stinkbugsfunc);
  intentMap.set('Ergot', ergotfunc);
  intentMap.set('Rust', rustfunc);
  
  
  intentMap.set('loan',axis_bank_func);
  intentMap.set('car loan',car_loan_func);
  intentMap.set('education loan',education_loan_func);
  intentMap.set('home loan',home_loan_func);
  intentMap.set('Agriculture loan' , agri_func);
  intentMap.set('Horticulture',horti_func);
  intentMap.set('tractor loan',tractor_func);    
  intentMap.set('personal loan',personal_loan_func);
  intentMap.set('business loan',business_loan_func);
  
  intentMap.set('update kernelsmut',updatekernelsmutfunc);
  intentMap.set('update Mildew Sphaerotheca' ,updatemildewfunc); 
  intentMap.set('update neck rot' ,updateneckrotfunc);
  intentMap.set('update soft rot' ,updatesoftrotfunc);
  intentMap.set('update smudge' ,updatesmudgefunc);
  intentMap.set('update anthracnose' ,updateanthracnosefunc);
  intentMap.set('update stinkbugs' ,updatestinkbugsfunc);
  intentMap.set('update ergot' ,updateergotfunc);
  intentMap.set('update rust' ,updaterustfunc);

    
  intentMap.set('update',updatefunc);
  intentMap.set('Logout',logout_func);
              
           
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});