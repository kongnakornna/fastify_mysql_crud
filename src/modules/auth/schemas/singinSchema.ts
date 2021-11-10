export default {
  body: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 4,
        maxLength: 500
      },
      password: {
        type: 'string',
       // minLength: 15,
       // maxLength: 100
      }, 
    },
    required: [ // important ,validate role ,input data
        'username', 
        'password',  
    ]
  }
}