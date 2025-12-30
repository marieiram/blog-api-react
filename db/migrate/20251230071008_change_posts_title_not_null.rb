class ChangePostsTitleNotNull < ActiveRecord::Migration[8.1]
  def change
    change_column :posts, :title, :string, null: false
  end
end
