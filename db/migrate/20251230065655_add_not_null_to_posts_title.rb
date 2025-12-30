class AddNotNullToPostsTitle < ActiveRecord::Migration[8.1]
  def change
    change_column_null :posts, :title, false
  end
end
