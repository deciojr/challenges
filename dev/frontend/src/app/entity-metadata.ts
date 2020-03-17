import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

export const entityNames = {
  user: 'User',
  hero: 'Hero',
};

const defaultEntityDispatcherOptions = {
  optimisticAdd: false,
  optimisticSaveEntities: false,
  optimisticDelete: false,
  optimisticUpdate: false,
  optimisticUpsert: false,
};

const entityMetadata: EntityMetadataMap = {
  User: {
    entityDispatcherOptions: {
      ...defaultEntityDispatcherOptions,
    },
  },
  Hero: {
    entityDispatcherOptions: {
      ...defaultEntityDispatcherOptions,
    },
  },
};

const pluralNames = {
  Hero: 'hero',
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
