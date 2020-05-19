/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * unique or primary key constraints on table "auth.account_providers"
 */
export enum auth_account_providers_constraint {
  account_providers_account_id_auth_provider_key = "account_providers_account_id_auth_provider_key",
  account_providers_auth_provider_auth_provider_unique_id_key = "account_providers_auth_provider_auth_provider_unique_id_key",
  account_providers_pkey = "account_providers_pkey",
}

/**
 * update columns of table "auth.account_providers"
 */
export enum auth_account_providers_update_column {
  account_id = "account_id",
  auth_provider = "auth_provider",
  auth_provider_unique_id = "auth_provider_unique_id",
  created_at = "created_at",
  id = "id",
  updated_at = "updated_at",
}

/**
 * unique or primary key constraints on table "auth.account_roles"
 */
export enum auth_account_roles_constraint {
  account_roles_pkey = "account_roles_pkey",
  user_roles_account_id_role_key = "user_roles_account_id_role_key",
}

/**
 * update columns of table "auth.account_roles"
 */
export enum auth_account_roles_update_column {
  account_id = "account_id",
  created_at = "created_at",
  id = "id",
  role = "role",
}

/**
 * unique or primary key constraints on table "auth.accounts"
 */
export enum auth_accounts_constraint {
  accounts_email_key = "accounts_email_key",
  accounts_new_email_key = "accounts_new_email_key",
  accounts_pkey = "accounts_pkey",
  accounts_user_id_key = "accounts_user_id_key",
}

/**
 * update columns of table "auth.accounts"
 */
export enum auth_accounts_update_column {
  active = "active",
  created_at = "created_at",
  custom_register_data = "custom_register_data",
  default_role = "default_role",
  email = "email",
  id = "id",
  is_anonymous = "is_anonymous",
  mfa_enabled = "mfa_enabled",
  new_email = "new_email",
  otp_secret = "otp_secret",
  password_hash = "password_hash",
  ticket = "ticket",
  ticket_expires_at = "ticket_expires_at",
  updated_at = "updated_at",
  user_id = "user_id",
}

/**
 * unique or primary key constraints on table "auth.providers"
 */
export enum auth_providers_constraint {
  providers_pkey = "providers_pkey",
}

/**
 * update columns of table "auth.providers"
 */
export enum auth_providers_update_column {
  provider = "provider",
}

/**
 * unique or primary key constraints on table "auth.refresh_tokens"
 */
export enum auth_refresh_tokens_constraint {
  refresh_tokens_pkey = "refresh_tokens_pkey",
}

/**
 * update columns of table "auth.refresh_tokens"
 */
export enum auth_refresh_tokens_update_column {
  account_id = "account_id",
  created_at = "created_at",
  expires_at = "expires_at",
  refresh_token = "refresh_token",
}

/**
 * unique or primary key constraints on table "auth.roles"
 */
export enum auth_roles_constraint {
  roles_pkey = "roles_pkey",
}

/**
 * update columns of table "auth.roles"
 */
export enum auth_roles_update_column {
  role = "role",
}

/**
 * unique or primary key constraints on table "files"
 */
export enum files_constraint {
  files_pkey = "files_pkey",
}

/**
 * update columns of table "files"
 */
export enum files_update_column {
  created_at = "created_at",
  downloadable_url = "downloadable_url",
  file_path = "file_path",
  id = "id",
  user_id = "user_id",
}

/**
 * unique or primary key constraints on table "todos"
 */
export enum todos_constraint {
  todos_pkey = "todos_pkey",
}

/**
 * update columns of table "todos"
 */
export enum todos_update_column {
  created_at = "created_at",
  done = "done",
  id = "id",
  todo = "todo",
  updated_at = "updated_at",
  user_id = "user_id",
}

/**
 * unique or primary key constraints on table "users"
 */
export enum users_constraint {
  users_pkey = "users_pkey",
}

/**
 * update columns of table "users"
 */
export enum users_update_column {
  avatar_url = "avatar_url",
  created_at = "created_at",
  display_name = "display_name",
  id = "id",
  updated_at = "updated_at",
}

/**
 * expression to compare columns of type Boolean. All fields are combined with logical 'AND'.
 */
export interface Boolean_comparison_exp {
  _eq?: boolean | null;
  _gt?: boolean | null;
  _gte?: boolean | null;
  _in?: boolean[] | null;
  _is_null?: boolean | null;
  _lt?: boolean | null;
  _lte?: boolean | null;
  _neq?: boolean | null;
  _nin?: boolean[] | null;
}

/**
 * expression to compare columns of type String. All fields are combined with logical 'AND'.
 */
export interface String_comparison_exp {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
}

/**
 * input type for inserting array relation for remote table "auth.account_providers"
 */
export interface auth_account_providers_arr_rel_insert_input {
  data: auth_account_providers_insert_input[];
  on_conflict?: auth_account_providers_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "auth.account_providers". All fields are combined with a logical 'AND'.
 */
export interface auth_account_providers_bool_exp {
  _and?: (auth_account_providers_bool_exp | null)[] | null;
  _not?: auth_account_providers_bool_exp | null;
  _or?: (auth_account_providers_bool_exp | null)[] | null;
  account?: auth_accounts_bool_exp | null;
  account_id?: uuid_comparison_exp | null;
  auth_provider?: String_comparison_exp | null;
  auth_provider_unique_id?: String_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  provider?: auth_providers_bool_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "auth.account_providers"
 */
export interface auth_account_providers_insert_input {
  account?: auth_accounts_obj_rel_insert_input | null;
  account_id?: gql_uuid | null;
  auth_provider?: string | null;
  auth_provider_unique_id?: string | null;
  created_at?: gql_timestamptz | null;
  id?: gql_uuid | null;
  provider?: auth_providers_obj_rel_insert_input | null;
  updated_at?: gql_timestamptz | null;
}

/**
 * on conflict condition type for table "auth.account_providers"
 */
export interface auth_account_providers_on_conflict {
  constraint: auth_account_providers_constraint;
  update_columns: auth_account_providers_update_column[];
  where?: auth_account_providers_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "auth.account_roles"
 */
export interface auth_account_roles_arr_rel_insert_input {
  data: auth_account_roles_insert_input[];
  on_conflict?: auth_account_roles_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "auth.account_roles". All fields are combined with a logical 'AND'.
 */
export interface auth_account_roles_bool_exp {
  _and?: (auth_account_roles_bool_exp | null)[] | null;
  _not?: auth_account_roles_bool_exp | null;
  _or?: (auth_account_roles_bool_exp | null)[] | null;
  account?: auth_accounts_bool_exp | null;
  account_id?: uuid_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  role?: String_comparison_exp | null;
  roleByRole?: auth_roles_bool_exp | null;
}

/**
 * input type for inserting data into table "auth.account_roles"
 */
export interface auth_account_roles_insert_input {
  account?: auth_accounts_obj_rel_insert_input | null;
  account_id?: gql_uuid | null;
  created_at?: gql_timestamptz | null;
  id?: gql_uuid | null;
  role?: string | null;
  roleByRole?: auth_roles_obj_rel_insert_input | null;
}

/**
 * on conflict condition type for table "auth.account_roles"
 */
export interface auth_account_roles_on_conflict {
  constraint: auth_account_roles_constraint;
  update_columns: auth_account_roles_update_column[];
  where?: auth_account_roles_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "auth.accounts"
 */
export interface auth_accounts_arr_rel_insert_input {
  data: auth_accounts_insert_input[];
  on_conflict?: auth_accounts_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "auth.accounts". All fields are combined with a logical 'AND'.
 */
export interface auth_accounts_bool_exp {
  _and?: (auth_accounts_bool_exp | null)[] | null;
  _not?: auth_accounts_bool_exp | null;
  _or?: (auth_accounts_bool_exp | null)[] | null;
  account_providers?: auth_account_providers_bool_exp | null;
  account_roles?: auth_account_roles_bool_exp | null;
  active?: Boolean_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  custom_register_data?: jsonb_comparison_exp | null;
  default_role?: String_comparison_exp | null;
  email?: citext_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  is_anonymous?: Boolean_comparison_exp | null;
  mfa_enabled?: Boolean_comparison_exp | null;
  new_email?: citext_comparison_exp | null;
  otp_secret?: String_comparison_exp | null;
  password_hash?: String_comparison_exp | null;
  refresh_tokens?: auth_refresh_tokens_bool_exp | null;
  role?: auth_roles_bool_exp | null;
  ticket?: uuid_comparison_exp | null;
  ticket_expires_at?: timestamptz_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
  user?: users_bool_exp | null;
  user_id?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "auth.accounts"
 */
export interface auth_accounts_insert_input {
  account_providers?: auth_account_providers_arr_rel_insert_input | null;
  account_roles?: auth_account_roles_arr_rel_insert_input | null;
  active?: boolean | null;
  created_at?: gql_timestamptz | null;
  custom_register_data?: gql_jsonb | null;
  default_role?: string | null;
  email?: gql_citext | null;
  id?: gql_uuid | null;
  is_anonymous?: boolean | null;
  mfa_enabled?: boolean | null;
  new_email?: gql_citext | null;
  otp_secret?: string | null;
  password_hash?: string | null;
  refresh_tokens?: auth_refresh_tokens_arr_rel_insert_input | null;
  role?: auth_roles_obj_rel_insert_input | null;
  ticket?: gql_uuid | null;
  ticket_expires_at?: gql_timestamptz | null;
  updated_at?: gql_timestamptz | null;
  user?: users_obj_rel_insert_input | null;
  user_id?: gql_uuid | null;
}

/**
 * input type for inserting object relation for remote table "auth.accounts"
 */
export interface auth_accounts_obj_rel_insert_input {
  data: auth_accounts_insert_input;
  on_conflict?: auth_accounts_on_conflict | null;
}

/**
 * on conflict condition type for table "auth.accounts"
 */
export interface auth_accounts_on_conflict {
  constraint: auth_accounts_constraint;
  update_columns: auth_accounts_update_column[];
  where?: auth_accounts_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'.
 */
export interface auth_providers_bool_exp {
  _and?: (auth_providers_bool_exp | null)[] | null;
  _not?: auth_providers_bool_exp | null;
  _or?: (auth_providers_bool_exp | null)[] | null;
  account_providers?: auth_account_providers_bool_exp | null;
  provider?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "auth.providers"
 */
export interface auth_providers_insert_input {
  account_providers?: auth_account_providers_arr_rel_insert_input | null;
  provider?: string | null;
}

/**
 * input type for inserting object relation for remote table "auth.providers"
 */
export interface auth_providers_obj_rel_insert_input {
  data: auth_providers_insert_input;
  on_conflict?: auth_providers_on_conflict | null;
}

/**
 * on conflict condition type for table "auth.providers"
 */
export interface auth_providers_on_conflict {
  constraint: auth_providers_constraint;
  update_columns: auth_providers_update_column[];
  where?: auth_providers_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "auth.refresh_tokens"
 */
export interface auth_refresh_tokens_arr_rel_insert_input {
  data: auth_refresh_tokens_insert_input[];
  on_conflict?: auth_refresh_tokens_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'.
 */
export interface auth_refresh_tokens_bool_exp {
  _and?: (auth_refresh_tokens_bool_exp | null)[] | null;
  _not?: auth_refresh_tokens_bool_exp | null;
  _or?: (auth_refresh_tokens_bool_exp | null)[] | null;
  account?: auth_accounts_bool_exp | null;
  account_id?: uuid_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  expires_at?: timestamptz_comparison_exp | null;
  refresh_token?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "auth.refresh_tokens"
 */
export interface auth_refresh_tokens_insert_input {
  account?: auth_accounts_obj_rel_insert_input | null;
  account_id?: gql_uuid | null;
  created_at?: gql_timestamptz | null;
  expires_at?: gql_timestamptz | null;
  refresh_token?: gql_uuid | null;
}

/**
 * on conflict condition type for table "auth.refresh_tokens"
 */
export interface auth_refresh_tokens_on_conflict {
  constraint: auth_refresh_tokens_constraint;
  update_columns: auth_refresh_tokens_update_column[];
  where?: auth_refresh_tokens_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'.
 */
export interface auth_roles_bool_exp {
  _and?: (auth_roles_bool_exp | null)[] | null;
  _not?: auth_roles_bool_exp | null;
  _or?: (auth_roles_bool_exp | null)[] | null;
  account_roles?: auth_account_roles_bool_exp | null;
  accounts?: auth_accounts_bool_exp | null;
  role?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "auth.roles"
 */
export interface auth_roles_insert_input {
  account_roles?: auth_account_roles_arr_rel_insert_input | null;
  accounts?: auth_accounts_arr_rel_insert_input | null;
  role?: string | null;
}

/**
 * input type for inserting object relation for remote table "auth.roles"
 */
export interface auth_roles_obj_rel_insert_input {
  data: auth_roles_insert_input;
  on_conflict?: auth_roles_on_conflict | null;
}

/**
 * on conflict condition type for table "auth.roles"
 */
export interface auth_roles_on_conflict {
  constraint: auth_roles_constraint;
  update_columns: auth_roles_update_column[];
  where?: auth_roles_bool_exp | null;
}

/**
 * expression to compare columns of type citext. All fields are combined with logical 'AND'.
 */
export interface citext_comparison_exp {
  _eq?: gql_citext | null;
  _gt?: gql_citext | null;
  _gte?: gql_citext | null;
  _ilike?: string | null;
  _in?: gql_citext[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: gql_citext | null;
  _lte?: gql_citext | null;
  _neq?: gql_citext | null;
  _nilike?: string | null;
  _nin?: gql_citext[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
}

/**
 * input type for inserting array relation for remote table "files"
 */
export interface files_arr_rel_insert_input {
  data: files_insert_input[];
  on_conflict?: files_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "files". All fields are combined with a logical 'AND'.
 */
export interface files_bool_exp {
  _and?: (files_bool_exp | null)[] | null;
  _not?: files_bool_exp | null;
  _or?: (files_bool_exp | null)[] | null;
  created_at?: timestamptz_comparison_exp | null;
  downloadable_url?: String_comparison_exp | null;
  file_path?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  user?: users_bool_exp | null;
  user_id?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "files"
 */
export interface files_insert_input {
  created_at?: gql_timestamptz | null;
  downloadable_url?: string | null;
  file_path?: string | null;
  id?: gql_uuid | null;
  user?: users_obj_rel_insert_input | null;
  user_id?: gql_uuid | null;
}

/**
 * on conflict condition type for table "files"
 */
export interface files_on_conflict {
  constraint: files_constraint;
  update_columns: files_update_column[];
  where?: files_bool_exp | null;
}

/**
 * expression to compare columns of type jsonb. All fields are combined with logical 'AND'.
 */
export interface jsonb_comparison_exp {
  _contained_in?: gql_jsonb | null;
  _contains?: gql_jsonb | null;
  _eq?: gql_jsonb | null;
  _gt?: gql_jsonb | null;
  _gte?: gql_jsonb | null;
  _has_key?: string | null;
  _has_keys_all?: string[] | null;
  _has_keys_any?: string[] | null;
  _in?: gql_jsonb[] | null;
  _is_null?: boolean | null;
  _lt?: gql_jsonb | null;
  _lte?: gql_jsonb | null;
  _neq?: gql_jsonb | null;
  _nin?: gql_jsonb[] | null;
}

/**
 * expression to compare columns of type timestamptz. All fields are combined with logical 'AND'.
 */
export interface timestamptz_comparison_exp {
  _eq?: gql_timestamptz | null;
  _gt?: gql_timestamptz | null;
  _gte?: gql_timestamptz | null;
  _in?: gql_timestamptz[] | null;
  _is_null?: boolean | null;
  _lt?: gql_timestamptz | null;
  _lte?: gql_timestamptz | null;
  _neq?: gql_timestamptz | null;
  _nin?: gql_timestamptz[] | null;
}

/**
 * input type for inserting array relation for remote table "todos"
 */
export interface todos_arr_rel_insert_input {
  data: todos_insert_input[];
  on_conflict?: todos_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "todos". All fields are combined with a logical 'AND'.
 */
export interface todos_bool_exp {
  _and?: (todos_bool_exp | null)[] | null;
  _not?: todos_bool_exp | null;
  _or?: (todos_bool_exp | null)[] | null;
  created_at?: timestamptz_comparison_exp | null;
  done?: Boolean_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  todo?: String_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
  user?: users_bool_exp | null;
  user_id?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "todos"
 */
export interface todos_insert_input {
  created_at?: gql_timestamptz | null;
  done?: boolean | null;
  id?: gql_uuid | null;
  todo?: string | null;
  updated_at?: gql_timestamptz | null;
  user?: users_obj_rel_insert_input | null;
  user_id?: gql_uuid | null;
}

/**
 * on conflict condition type for table "todos"
 */
export interface todos_on_conflict {
  constraint: todos_constraint;
  update_columns: todos_update_column[];
  where?: todos_bool_exp | null;
}

/**
 * input type for updating data in table "todos"
 */
export interface todos_set_input {
  created_at?: gql_timestamptz | null;
  done?: boolean | null;
  id?: gql_uuid | null;
  todo?: string | null;
  updated_at?: gql_timestamptz | null;
  user_id?: gql_uuid | null;
}

/**
 * Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'.
 */
export interface users_bool_exp {
  _and?: (users_bool_exp | null)[] | null;
  _not?: users_bool_exp | null;
  _or?: (users_bool_exp | null)[] | null;
  account?: auth_accounts_bool_exp | null;
  avatar_url?: String_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  display_name?: String_comparison_exp | null;
  files?: files_bool_exp | null;
  id?: uuid_comparison_exp | null;
  todos?: todos_bool_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "users"
 */
export interface users_insert_input {
  account?: auth_accounts_obj_rel_insert_input | null;
  avatar_url?: string | null;
  created_at?: gql_timestamptz | null;
  display_name?: string | null;
  files?: files_arr_rel_insert_input | null;
  id?: gql_uuid | null;
  todos?: todos_arr_rel_insert_input | null;
  updated_at?: gql_timestamptz | null;
}

/**
 * input type for inserting object relation for remote table "users"
 */
export interface users_obj_rel_insert_input {
  data: users_insert_input;
  on_conflict?: users_on_conflict | null;
}

/**
 * on conflict condition type for table "users"
 */
export interface users_on_conflict {
  constraint: users_constraint;
  update_columns: users_update_column[];
  where?: users_bool_exp | null;
}

/**
 * expression to compare columns of type uuid. All fields are combined with logical 'AND'.
 */
export interface uuid_comparison_exp {
  _eq?: gql_uuid | null;
  _gt?: gql_uuid | null;
  _gte?: gql_uuid | null;
  _in?: gql_uuid[] | null;
  _is_null?: boolean | null;
  _lt?: gql_uuid | null;
  _lte?: gql_uuid | null;
  _neq?: gql_uuid | null;
  _nin?: gql_uuid[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
