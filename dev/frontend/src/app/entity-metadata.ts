import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

export const entityNames = {
  user: 'User',
  hero: 'Hero',
  threat: 'Threat',
};

const defaultEntityDispatcherOptions = {
  optimisticAdd: false,
  optimisticSaveEntities: false,
  optimisticDelete: false,
  optimisticUpdate: false,
  optimisticUpsert: false,
};

const entityMetadata: EntityMetadataMap = {
  [entityNames.user]: {
    entityDispatcherOptions: {
      ...defaultEntityDispatcherOptions,
    },
  },
  [entityNames.hero]: {
    entityDispatcherOptions: {
      ...defaultEntityDispatcherOptions,
    },
  },
  [entityNames.threat]: {
    entityDispatcherOptions: {
      ...defaultEntityDispatcherOptions,
    },
  },
};

const pluralNames = {
  [entityNames.hero]: entityNames.hero.toLocaleLowerCase(),
  [entityNames.threat]: entityNames.threat.toLocaleLowerCase(),
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
