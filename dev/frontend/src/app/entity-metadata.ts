import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

export const entityNames = {
  user: 'User',
};

const entityMetadata: EntityMetadataMap = {
  User: {
    entityDispatcherOptions: {
      optimisticAdd: false,
      optimisticSaveEntities: false,
      optimisticDelete: false,
      optimisticUpdate: false,
      optimisticUpsert: false,
    },
  },
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
