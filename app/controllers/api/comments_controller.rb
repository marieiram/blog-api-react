class Api::CommentsController < ApplicationController
    protect_from_forgery with: :null_session

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
  comment.user = User.first
  # 仮に最初のユーザーを設定。認証実装後にcurrent_userに変更すること。

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
