class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
        t.string :username, null: false
        t.string :session_token, null: false
        t.string :pinterest_auth_code
        t.string :pinterest_access_token, null: false
        t.timestamps null: false
    end
     add_index :users, :username, unique: true
  end
end
