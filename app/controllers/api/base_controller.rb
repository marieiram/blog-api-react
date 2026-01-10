# app/controllers/api/base_controller.rb
module Api
  class BaseController < ActionController::API
    private

    def authenticate_api_user
      auth_header = request.headers["Authorization"]
      return render_unauthorized unless auth_header

      token = auth_header.split(" ").last
      user_id = token.split("-").last

      @current_user = User.find_by(id: user_id)
      render_unauthorized unless @current_user
    end

    def render_unauthorized
      render json: { message: "認証が必要です" }, status: :unauthorized
    end
  end
end
