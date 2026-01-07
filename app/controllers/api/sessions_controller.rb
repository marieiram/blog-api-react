class Api::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      render json: { message: "ログイン成功", user: user.api_json }, status: :ok
    else
      render json: { message: "ログイン失敗" }, status: :unauthorized
    end
  end

  def destroy
    # APIログアウトの処理（必要に応じて実装）
    render json: { message: "ログアウト成功" }, status: :ok
  end
end
