//api notifactions messages 

export const API_NOTIFICATIONS_MESSAGES={
    loading:{
        title:'Loading...',
        message:'Data is being loaded , Please wait'
    },
    success:{
        title:'Success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message:'An error occurred while fetching response from the server. Plase try later'
    },
    requestfailure:{
        title:'Error',
        message:'An error occurred while parsing request data'
    },
    networkError:{
        title:'Error',
        message:'unable to connect with server. Please Check internet Connectivity'
    }
}

//Api service call
export const SERVICE_URLS = {
    userSignup:{
        url:'/signup',method:'POST'
    },
    userLogin:{
        url:'/login',method:'POST'
    }
}