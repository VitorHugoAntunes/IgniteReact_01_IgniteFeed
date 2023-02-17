import {format, formatDistanceToNow} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: string;
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({author, publishedAt, content}: PostProps){
    // Comments state 
    const [comments, setComments] = useState([
        'Post legal, parabens!',
    ])

    const [newCommentText, setNewCommentText] = useState('');

    // Format local date
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL - HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    // Updates comments section state with a new comment
    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    // Set comment with textarea form data
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Este campo é obrigatório.');
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })
        
        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time 
                    title={publishedDateFormatted} 
                    dateTime={publishedAt.toISOString()}
                    >
            
                    {publishedDateRelativeToNow}
                    </time>
                </header>
            <div className={styles.content}>
                {content.map(line => {
                    if(line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href='#'>{line.content}</a></p>;
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe seu comentario'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Comentar</button>
                </footer>
            </form>

            {/* Returns the post comments */}
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
                })}
            </div>
        </article>
    )
}