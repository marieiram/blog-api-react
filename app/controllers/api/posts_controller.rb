# app/controllers/api/posts_controller.rb
class Api::PostsController < ApplicationController
  protect_from_forgery with: :null_session

# 　before_action :authenticate_user!, only: [ :create, :update, :destroy ]
before_action :set_post, only: [ :show, :update, :destroy ]

 # GET /api/posts
 def index
   # 　modelに取得を依頼
   posts = Post.includes(:user)
   # 　json形式で返却
   render json: posts.map(&:api_json)
  end

  # GET /api/posts/:id
  def show
    post = Post.includes(:user).find(params[:id])
    render json: post.api_json
  end

  # POST /api/posts
  def create
   post = Post.new(post_params)
   post.user = current_user

    if post.save
      render json: post.api_json, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH /api/posts/:id
  def update
    if @post.update(post_params)
      render json: @post.api_json
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/posts/:id
  def destroy
    @post.destroy
    head :no_content
  end

  private

  def set_post
    @post = Post.includes(:user).find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
