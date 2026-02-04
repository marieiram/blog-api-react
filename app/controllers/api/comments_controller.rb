class Api::CommentsController < Api::BaseController
    before_action :authenticate_api_user, only: [ :create, :destroy ]

# GET /api/posts/:post_id/comments
def index
  post = Post.find(params[:post_id])
  comments = post.comments.includes(:user)
  render json: comments.map(&:api_json)
end

# POST /api/posts/:post_id/comments
def create
  post = Post.find(params[:post_id])
  comment = post.comments.build(comment_params)
  comment.user = current_user


  if comment.save
    render json: comment.api_json, status: :created
  else
    render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
  end
end

# DELETE /api/comments/:id
def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    head :no_content
    end

private
def comment_params
  params.require(:comment).permit(:body)
end
end
