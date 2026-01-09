class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  # APIリクエストのCSRF対策を有効
  protect_from_forgery with: :exception

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
