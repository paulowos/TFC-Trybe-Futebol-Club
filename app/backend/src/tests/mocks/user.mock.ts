const userFromDB = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  //password = secret_admin
};

const userRequest = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const userRequestNoPassword = {
  email: 'admin@admin.com',
};

const userRequestNoEmail = {
  password: 'secret_admin',
};

export { userFromDB, userRequest, userRequestNoPassword, userRequestNoEmail };
