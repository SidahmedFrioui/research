export type Review = {
    id: number;
    article_id: number;
    reviewer_id: number;
    status: ReviewStatus;
    decision: string | null;
    comments: string | null;
    created_at: string;
    updated_at: string;
};

export type ReviewStatus = 'pending' | 'completed';