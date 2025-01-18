exports.getPosts = (req, res, next) => {
    res.status(200).json({
         posts: [{ title: 'First Post', content: 'This is the first post'}]
    });
}; // 데이터 반환

exports.postPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // db에 생성
    res.status(201).json({ // 리소스 생성 성공은 201
        message: 'Post crested successfully!',
        post: { id: new Date().toISOString(), title, content}
    });
};