# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,add_index  :users, :name|
|email|string|null: false|
|password|string|null:false|

### Association
- has_many :messages
- has_many :groups, through: :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :users, through: :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :member


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :user
- belongs_to :member