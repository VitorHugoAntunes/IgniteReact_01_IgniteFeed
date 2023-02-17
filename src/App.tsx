import {Header} from './components/Header';
import {Post} from './components/Post';
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';
import './global.css'

// Posts data
const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/VitorHugoAntunes.png',
      name: 'Vitor Hugo',
      role: 'Student at Fatec & Ignite'
    },
    content: [
      {type: 'paragraph', content: 'Bom dia!'},
      {type: 'paragraph', content: 'Enviei mais um projeto para o Github.'},
      {type: 'link', content: 'https://github.com/VitorHugoAntunes'}
    ],
    publishedAt: new Date('2023-02-10 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator at Rocketseat'
    },
    content: [
      {type: 'paragraph', content: 'Bom dia!'},
      {type: 'paragraph', content: 'Enviei mais um projeto para o Github.'},
      {type: 'link', content: 'https://github.com/VitorHugoAntunes'}
    ],
    publishedAt: new Date('2023-02-10 20:00:00'),
  },
  {
    id: 3,
    author: {
      avatarUrl: 'https://github.com/filipedeschamps.png',
      name: 'Filipe Deschamps',
      role: 'Programmer & Youtuber'
    },
    content: [
      {type: 'paragraph', content: 'Bom dia!'},
      {type: 'paragraph', content: 'Enviei mais um projeto para o Github.'},
      {type: 'link', content: 'https://github.com/VitorHugoAntunes'}
    ],
    publishedAt: new Date('2023-02-10 20:00:00'),
  }
]

export function App() {
  return (
    <div>
      <Header/>
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
      
    </div>
  )
}