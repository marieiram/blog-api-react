class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates :body, presence: true
  validates :user, presence: true


    # API用JSON形式でのデータ返却
    def api_json
    {
      id: id,
      body: body,
      created_at: created_at,
      user: {
        id: user.id,
        email: user.email
    }
     }
  end
end
