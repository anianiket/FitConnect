import { Component,OnInit } from '@angular/core';
import  {ChatService} from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat.model';
import { Message } from 'src/app/models/message.model';
@Component({
  selector: 'app-adminchatsection',
  templateUrl: './adminchatsection.component.html',
  styleUrls: ['./adminchatsection.component.css']
})
export class AdminchatsectionComponent implements OnInit{
 
  constructor(private chatservice:ChatService){
   
  }
 selectedChat: Chat | null = null;
 newMessage: string = '';
 messages: Message[] = [];
 chatList: Chat[] = []
 sendermail:string = 'admin@example.com';
 filename :string = '';


 
 ngOnInit() {
   if (this.chatList.length > 0) {
     this.selectedChat = this.chatList[0];
     this.messages = this.chatList[0].chatMessage;
   }
   setInterval(()=>{
     this.getChats();
   },5000)
   
 }
  
 selectChat(chat: Chat) {
   this.selectedChat = chat;
   this.messages = chat.chatMessage;
 }

 sendMessage() {
   const currentDate = new Date();

// Get the current time components
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

// Format the time as "HH:MM:SS"
const formattedTime = `${hours}:${minutes}:${seconds}`;    
  if (this.selectedChat && this.newMessage) {
  const message: Message = {
  senderEmail:this.sendermail,
  senderMessage: this.newMessage,
  senderMediaLinks:[],
  timeStamp :formattedTime,
  dateStamp :null

    }
  //  now send it to database
      this.chatservice.AddMessage(this.selectedChat.chatUserEmail, message).subscribe((data)=>
      {
     
      })
      
      if (this.messages === null){
       this.messages = [message]
      }
      else{
       this.messages.push(message)
       
      }
      this.newMessage = '';
     
   }
 }
 
 deleteMessage(message: Message) {
   const index = this.messages.indexOf(message);
   if (index !== -1) {
     this.messages.splice(index, 1);
   }
   
   this.chatservice.DeleteMessage(this.selectedChat?.chatUserEmail, message.dateStamp , message.timeStamp).subscribe((data)=>
   {
     
   })
 }

 check(message:Message)
 {
   
 }
 onAttachmentSelect(event: any) {
   const selectedFile = event.target.files[0];
   
   this.filename = selectedFile.name ;
   this.chatservice.AddFile(this.selectedChat?.chatUserEmail, this.sendermail , selectedFile , this.filename).subscribe((data)=>{
     
     this.messages.push(data.chatMessage[data.chatMessage.length-1]);
   })
 }

 deleteChat(chatToDelete: Chat) {
   // Find the index of the chat to delete in the chatList array
   const index = this.chatList.indexOf(chatToDelete);

   if (index !== -1) {
     // Remove the chat from the chatList
     this.chatList.splice(index, 1);
   }

   // Optionally, you can also clear the selectedChat if it matches the chatToDelete
   if (this.selectedChat === chatToDelete) {
     this.selectedChat = null;
   }
 }
 // method to get all the chats from database 
 public getChats()
 {
   return this.chatservice.getChats().subscribe(
     (res)=>{
       this.chatList = res
     } ,
     (err) =>{
       console.log(err)
     }
   )
 }
 downloadImageOrPDF(Url:string) {
   const url = Url; // Replace with the actual file URL
   this.chatservice.downloadFile(url).subscribe(
     (fileBlob) => {
       const blobUrl = URL.createObjectURL(fileBlob);

       // Create a hidden anchor element to trigger the download
       const a = document.createElement('a');
       a.href = blobUrl;
       a.download = 'File'; // Specify the desired file name
       a.style.display = 'none';
       document.body.appendChild(a);

       // Trigger the download
       a.click();

       // Clean up
       document.body.removeChild(a);
       URL.revokeObjectURL(blobUrl);
     },
     (error) => {
       console.error('Failed to download file:', error);
     }
   );
 }

}