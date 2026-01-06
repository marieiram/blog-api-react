class Post < ApplicationRecord
    validates :title, presence: true, length: { maximum: 50 }
    validates :body, presence: true
    has_many :comments, dependent: :destroy
    belongs_to :user

    # API用JSON形式でのデータ返却
    def api_json
    {
      id: id,
      title: title,
      body: body,
      created_at: created_at,
      user: {
        id: user.id,
        email: user.email
      }
    }
  end
end
