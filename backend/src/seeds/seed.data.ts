import { DataSource, DeepPartial, In } from 'typeorm';
import { Permission } from 'src/permissions/entity/permission.entity';
import { Role } from 'src/roles/entity/role.entity';
import { PERMISSIONS_LIST, ROLE_LIST, USERS_LIST } from './data';
import { User } from 'src/users/entity/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedData(dataSource: DataSource): Promise<void> {

  const permissionRepository = dataSource.getRepository(Permission);
  const roleRepository = dataSource.getRepository(Role);
  const userRepository = dataSource.getRepository(User);

  // Seed Permissions
  const permissionsList = PERMISSIONS_LIST;
  for (const permission of permissionsList) {
    const _permission = permissionRepository.create(permission as Permission);
    await permissionRepository.save(_permission);
  }

  // Seed Roles
  const rolesList = ROLE_LIST;
  for (const role of rolesList) {
    const _permissions = await permissionRepository.findBy({
      id: In(role.permissions),
    });
    const _roleItem = {
      name: role.name,
      permissions: _permissions,
    };
    const _role = roleRepository.create({
      ..._roleItem,
      permissions: _permissions,
    });
    await roleRepository.save(_role);
  }

  // Seed Users
  const userList = USERS_LIST;
  for (const user of userList) {
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;

    // Assuming you have a 'roles' relationship in your User entity
    // const _role = await roleRepository.find({
    //   where: { id: Number(user.roles) },
    // });

    const _user = userRepository.create({
      ...user,
    } as DeepPartial<User>); // Type assertion here

    console.log(user)

    const data = await userRepository.save(_user);
    console.log(data)
  }
}
