export const TypeOrmConfig: any = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'db_angular_nest_cypres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  seeds: [__dirname + '/../**/*.seed{.ts,.js}'],
  synchronize: true,
}