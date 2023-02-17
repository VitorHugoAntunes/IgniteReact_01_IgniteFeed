import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';

import styles from './Comment.module.css';

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({content, onDeleteComment}: CommentProps){
    // Delete comment
    function handleDeleteComment(){
        onDeleteComment(content);
    }

    const [likeCount, setLikeCount] = useState(0);

    // Closure
    function handleLikeComment() {
        // Valor atualizado dos likes, e nao o seu valor do estado anterior
        setLikeCount((likeState) => {
            return likeState + 1;
        })
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/VitorHugoAntunes.png" alt=""/>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Vitor Hugo</strong>
                            <time title='13 de Jan - 08:00h'>Cerca de 1h atras</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentario'>
                            <Trash size={20} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment} /*Pode ser substituido por arrow function dentro do evento onClick */>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}