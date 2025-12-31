class PostsController < ApplicationController
  # show, edit, update, destroyが呼ばれる前にset_postメソッドを実行する
  before_action :set_post, only: %i[ show edit update destroy ]
  # 新規作成、編集、削除はログイン必須にする　ログインしてなくても一覧詳細は見れる
  before_action :authenticate_user!, except: [ :index, :show ]

  def authorize_user!
  redirect_to posts_path, alert: "権限がありません" unless @post.user == current_user
end

  # GET /posts or /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1 or /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts or /posts.json
  def create
    Rails.logger.debug "PARAMS: #{params.inspect}"
    # @post = Post.new(post_params)
    @post = current_user.posts.build(post_params)


    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: "Post was successfully created." }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    Rails.logger.debug "================ UPDATE START ================"
    Rails.logger.debug "PARAMS: #{params.inspect}"

    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: "Post was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy!

    respond_to do |format|
      format.html { redirect_to posts_path, notice: "Post was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private

  def set_post
    Rails.logger.debug "SET_POST CALLED with id=#{params[:id]}"
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
