### Clone code from gitlab
```
    git clone gitlab.repo
    git checkout master
    cp -r .env.example .env
```

### Config
```
    update .env
```

### Run dev
```
    yarn install
    yarn start:dev
```

### Migration databases.
```
    npm run migration:create --name=CreateTableName
    npm run migration:create --name=CreateTodoTable
```

```
 OR use typeorm :
 1. Create new migration
    npm run typeorm migration:create ./src/database/migrations/create-todo-table
    npm run typeorm migration:create ./src/database/migrations/upgrade-site-table
 2. Run new migration
    npm run typeorm migration:run -- -d ./src/database/migration.config.ts
```


### Install data
```cmd
    yarn cmd install --mode=user 
    yarn cmd install --mode=programs
    yarn cmd install --mode=roles
    yarn cmd install --mode=generic-code
    yarn cmd install --mode=drawing
    yarn cmd install --mode=area-schedule-standard
    yarn cmd install --mode=certificates
```
