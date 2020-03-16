import { createConnection, EntitySchema } from 'typeorm';
type Entity = Function | string | EntitySchema<any>;

export async function createInMemoryDatabaseConnection(
  entities: Entity[],
  name,
) {
  return createConnection({
    name,
    type: 'sqlite',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
    logging: false,
  });
}
