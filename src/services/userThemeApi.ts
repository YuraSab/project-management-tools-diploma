import { UserTheme } from "../types/userTheme";

export const updateOrCreateUserTheme = async ( theme: UserTheme ): Promise<UserTheme> => {
    let response = await fetch(`http://localhost:3001/userThemes/${theme.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(theme),
    });
    if ( !response.ok ) {
        response = await fetch(`http://localhost:3001/userThemes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(theme),
        });
        if ( !response.ok ) 
            throw new Error(`Error during saving user\`s theme. Status: ${response.status}`);
    }
    return response.json();
}