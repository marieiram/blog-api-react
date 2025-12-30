class AddNotNullToPostsBody2 < ActiveRecord::Migration[8.1]
  def change
    change_column :posts, :body, :text, null: false
  end
end
