class Api::SessionsController < Api::BaseController
  # 「すでにログインしているユーザーだけ通す」ためのフィルターなので、ログイン前の人が叩くcreateアクションには不要
  # before_action :authenticate_user!, only: [ :create, :update, :destroy ]

  def create
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      token = "dummy-token-#{user.id}" # 実際にはトークン生成ロジックを実装

      render json: { message: "ログイン成功", token: token, user: user.api_json }, status: :ok
    else
      render json: { message: "ログイン失敗" }, status: :unauthorized
    end
  end

  def destroy
    # APIログアウトの処理（必要に応じて実装）
    render json: { message: "ログアウト成功" }, status: :ok
  end
end
