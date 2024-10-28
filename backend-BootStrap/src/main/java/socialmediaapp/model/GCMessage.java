package socialmediaapp.model;

import jakarta.persistence.*;


@Entity
@Table(name = "gc_msg_tbl")
public class GCMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PK")
    private Long primaryKey;

    @Column(name = "FK")//to Group Chat ID
    private Long foreignKey;

    @Column(name = "SenderID")
    private Long senderID;

    @Column(name = "ReceiverID")
    private Long receiverID;

    @Column(name = "content")
    private String content;

    public Long getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(Long primaryKey) {
        this.primaryKey = primaryKey;
    }

    public Long getForeignKey() {
        return foreignKey;
    }

    public void setForeignKey(Long foreignKey) {
        this.foreignKey = foreignKey;
    }

    public Long getSenderID() {
        return senderID;
    }

    public void setSenderID(Long senderID) {
        this.senderID = senderID;
    }

    public Long getReceiverID() {
        return receiverID;
    }

    public void setReceiverID(Long receiverID) {
        this.receiverID = receiverID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }



}
