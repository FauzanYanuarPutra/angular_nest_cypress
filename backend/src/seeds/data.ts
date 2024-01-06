export const PERMISSIONS_LIST = [
  {
    id: 1,
    name: "create:permissions",
  }, 
  {
    id: 2,
    name: "update:permissions",
  },
  {
    id: 3,
    name: "delete:permissions",
  },
  {
    id: 4,
    name: "create:roles",
  },
  {
    id: 5,
    name: "update:roles",
  },
  {
    id: 6,
    name: "delete:roles",
  }
]

export const ROLE_LIST = [
  {
    name: "super-admin",
    permissions: []
  },
  {
    name: "admin",
    permissions: [1,2]
  },
  {
    name: "user",
    permissions: [3]
  },
  {
    name: "test",
    permissions: [4]
  }
];


export const USERS_LIST = [
  {
    id: 1,
    username: "super-admin",
    email: 'super-admin@gmail.com',
    role: 1,
    password: 'password'
  }
]