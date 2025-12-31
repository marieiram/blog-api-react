class Post < ApplicationRecord
    validates :title, presence: true, length: { maximum: 50 }
    validates :body, presence: true
    has_many :comments, dependent: :destroy
    belongs_to :user
end
