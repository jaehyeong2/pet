let index = {
    init:function (){
        $("#btn-save").on("click", () =>{
            this.save();
        });
        $("#btn-delete").on("click", ()=>{
            this.deleteById();
        });
        $("#btn-update").on("click", ()=>{
            this.update();
        });
        $("#btn-comment-save").on("click", ()=>{
            this.commentSave();
        });
        $("#btn-comment-delete").on("click", ()=>{
            this.commentDelete();
        });
    },

    save: function(){
        let data = {
            title: $("#title").val(),
            content: $("#content").val()
        };

        $.ajax({
            type: "POST",
            url: "/board",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function(){
            alert("글쓰기가 완료되었습니다.");
            location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },

    deleteById: function(){
        let id = $("#id").text();

        $.ajax({
            type: "DELETE",
            url: "/board/"+id,
            dataType: "json"
        }).done(function(resp){
            alert("삭제가 완료되었습니다.");
            location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },

    update: function(){
        let id = $("#id").val();

        let data = {
            title: $("#title").val(),
            content: $("#content").val()
        };

        $.ajax({
            type: "PUT",
            url: "/api/board/"+id,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function(resp){
            alert("글수정이 완료되었습니다.");
            location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },

    commentSave: function(){
        let data = {
            userId: $("#userId").val(),
            boardId: $("#boardId").val(),
            content: $("#comment-content").val()
        };

        $.ajax({
            type: "POST",
            url: `/board/${data.boardId}/comment`,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function(resp){
            alert("댓글작성이 완료되었습니다.");
            location.href = `/board/${data.boardId}`;
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },

    commentDelete : function(boardId, commentId){
        let data = {
            boardId: $("#boardId").val(),
            commentId: $("#commentId").val()
        };
        $.ajax({
            type: "DELETE",
            url: `/comment/${data.commentId}`,
            data: JSON.stringify(data),
            dataType: "json"
        }).done(function(resp){
            alert("댓글삭제가 완료되었습니다");
            location.href = `/board/${data.boardId}`;
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    }
}
index.init();