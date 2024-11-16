import { StringLiteral } from "typescript";

export default interface CommentListItem {
    nickname: string;
    profileImage: string | null;
    writeDatetime: string;
    content: string;
}