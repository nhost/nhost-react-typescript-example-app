# Nhost Example App with React

Simple [Nhost](https://nhost.io) example app using [Hasura](https://hasura.io).

## Get started

1. Create a project on nhost.io
2. Clone this repo
3. Edit config.js with the details from you project at nhost.io
4. `npm install`
5. `npm start`

## Auth

- [x] register page
- [x] activate account page
- [x] sign in page
- [x] new password page
- [ ] forgot password

## Storage

- [ ] upload file
- [ ] show file link (ex pdf)
- [ ] show file as image

## GraphQL

- [ ] Get data using query
- [x] Get data using subscriptions
- [x] Mutate data


# Install

## 1. Create Nhost project

## 2. Edit `src/config.js` with your Nhost project links

## 3. Add the todos table

  - Go to your **Hasura console**
  - Click on the **Data** tab in the top menu
  - Click on **SQL** in the left side menu
  - Copy and paste the content from `db.sql` (located here in the repo) in the **Raw SQL textarea** in the Hasura Console.
  - Check **Track this**
  - Click **Run!**

## 4. Set permissions

### TODOs permissions

  - Click on the `todos` table in the left side menu
  - Click on **Permissions** in the top menu
  - Enter a new role `user`
  - Click on the **X** under **insert** to start setting permissions for `insert`
    - Under **Row insert permissions**
        - Select **Without any checks**
      - Under **Column insert permissions**
        - Check `todo`
      - Under **Column presets**
        - Select **Column name** `user_id`
        - Select **Select preset type** `from session variable`
        - Insert **column-name** `user-id` *(NOT underscore)*
      - Click **Save Permissions**
  - Click on the **X** under **select** to start setting permissions for `select`
    - Under **Row select permissions**
      - Select **With custom check**
      - Create the following check: `{"user_id":{"_eq":"X-Hasura-User-Id"}}`
    - Under **Column select permissons**
      - Click the **Toggle All** button to select all columns
    - Under **Aggregation queries permissions**
      - Check **Allow role User to make aggregation queries**
    - Click **Save Permissions**
  - Click on the **X** under **update** to start setting permissions for `update`
    - Under **Row update permissions**
      - Select **With same custom checks as select**
    - Under **Column update permissions**
      - Check `todo` and `done`
    - Click **Save Permissions**
  - Click on the **X** under **delete** to start setting permissions for `delete`
    - Under **Row delete permissions**
      - Select **With same custom checks as select, update**
    - Click **Save Permissions**

### FILEs permissions
  - Click on the `files` table in the left side menu
  - Click on **Permissions** in the top menu
  - Enter a new role `user`
  - Click on the **X** under **insert** to start setting permissions for `insert`
    - Under **Row insert permissions**
        - Select **Without any checks**
      - Under **Column insert permissions**
        - Check `file_path` and `downloadable_url`
      - Under **Column presets**
        - Select **Column name** `user_id`
        - Select **Select preset type** `from session variable`
        - Insert **column-name** `user-id` *(NOT underscore)*
      - Click **Save Permissions**
  - Click on the **X** under **select** to start setting permissions for `select`
    - Under **Row select permissions**
      - Select **With custom check**
      - Create the following check: `{"user_id":{"_eq":"X-Hasura-User-Id"}}`
    - Under **Column select permissons**
      - Click the **Toggle All** button to select all columns
    - Under **Aggregation queries permissions**
      - Check **Allow role User to make aggregation queries**
    - Click **Save Permissions**
  - Click on the **X** under **delete** to start setting permissions for `delete`
    - Under **Row delete permissions**
      - Select **With same custom checks as select, update**
    - Click **Save Permissions**

## 5. Create GraphQL relations

  - Click on the **Data** tab in the top menu
  - Click **Track All** next to "Untracked foreign-key relations"

## 6. Start the app

```
npm install
npm start
```

The app should appear in the browser.


## 7. Register account


## 8. Login


## 9. Use the Todo app
