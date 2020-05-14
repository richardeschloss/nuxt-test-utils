# nuxt-test-utils
Nuxt testing utils (a single home for all your favorite testing utils)

The plan will be to include vue-test-utils and module-test-utils, and extend on what they do. 1 install for all testing needs (coming soon).

## Installation

> npm i --link richardeschloss/nuxt-test-utils # For the latest

Eventually, the stable releases will be in npm

## Usage

```
import TestUtils from 'nuxt-test-utils'
import config from '@/nuxt.config' // optional, but useful for utilities.
```

## Utilities

1. `getModuleOptions`:

Params:
- config: object, // provide nuxt.config
- moduleName: string
- optsContainer: object, // specify the container holding your options. defaults to moduleName. Options will be searched in this order: buildModules, then modules, then your optsContainer. As options are found, they'll be merged in.

