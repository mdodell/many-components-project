//helloWorld.js
const hubspot = require('@hubspot/api-client')

exports.main = async (context = {}, sendResponse) => {
    const hubspotClient = new hubspot.Client({ accessToken: context.secrets.PRIVATE_APP_ACCESS_TOKEN });
    
    const limit = 10;
    const after = undefined;
    const properties = undefined;
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;
    
    var output = "NONE";

    try {
      const apiResponse = 
        await hubspotClient.crm.contacts.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
      output = JSON.stringify(apiResponse.body);
    } catch (e) {
      e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }

    sendResponse({
      statusCode: 200,
      body: { message: 'Hello World, client initialized! ' + output },
    });
  };