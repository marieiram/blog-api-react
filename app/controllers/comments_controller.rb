class CommentsController < ApplicationController
 before_action :authenticate_user!
 before_action :set_comment, only: [ :destroy ]
 before_action :authorize_owner!, only: :destroy

    def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      redirect_to @post, notice: "コメントが保存されました"
    else
      render "posts/show", status: :unprocessable_entity
    end
  end

  def destroy
    # 権限チェック
    unless @comment.user == current_user
      redirect_to @comment.post, alert: "コメントを削除する権限がありません"
      return
    end

    post = @comment.post
    @comment.destroy
    redirect_to post, notice: "コメントを削除しました"
  end


  private

   def set_comment
    @comment = Comment.find(params[:id])
   end

   def authorize_owner!
    unless @comment.user == current_user
      redirect_to @comment.post, alert: "権限がありません"
    end
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
