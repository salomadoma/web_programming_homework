function createTeamBadge(team, small = true) {
    const badge = document.createElement("span");
    badge.className = small ? "team-dot" : "team-logo";

    if (team.color !== "dark") {
        badge.classList.add(`${small ? "team-dot" : "team-logo"}--${team.color}`);
    }

    badge.textContent = team.code;
    return badge;
}

function createTeam(team, isRight = false) {
    const element = document.createElement("div");
    element.className = "match-row__team";

    if (isRight) {
        element.classList.add("match-row__team--right");
        element.append(team.name, createTeamBadge(team));
    } else {
        element.append(createTeamBadge(team), team.name);
    }

    return element;
}

export function renderMatchRows(container, matchItems) {
    container.replaceChildren();

    if (matchItems.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-state";
        message.textContent = "Матчей для выбранного периода нет";
        container.append(message);
        return;
    }

    matchItems.forEach((match) => {
        const article = document.createElement("article");
        article.className = "match-row";

        const time = document.createElement("time");
        time.className = "match-row__time";
        time.textContent = match.time;

        const score = document.createElement("strong");
        score.className = "match-row__score";
        score.textContent = match.score ?? "— : —";

        article.append(
            time,
            createTeam(match.home),
            score,
            createTeam(match.away, true),
        );

        container.append(article);
    });
}

export function renderMatchGroups(container, matchItems) {
    container.replaceChildren();

    if (matchItems.length === 0) {
        const message = document.createElement("p");
        message.className = "card empty-state";
        message.textContent = "Матчей для выбранного периода нет";
        container.append(message);
        return;
    }

    const leagues = [...new Set(matchItems.map((match) => match.league))];

    leagues.forEach((leagueName) => {
        const leagueMatches = matchItems.filter((match) => match.league === leagueName);
        const firstMatch = leagueMatches[0];
        const section = document.createElement("section");
        section.className = "card league";

        const header = document.createElement("header");
        header.className = "league__header";

        const logo = document.createElement("span");
        logo.className = "league__logo";
        logo.textContent = firstMatch.leagueCode;

        const info = document.createElement("div");
        const title = document.createElement("h2");
        title.textContent = leagueName;
        const country = document.createElement("p");
        country.className = "league__country";
        country.textContent = firstMatch.country;
        info.append(title, country);

        const list = document.createElement("div");
        list.className = "match-list";
        renderMatchRows(list, leagueMatches);

        header.append(logo, info);
        section.append(header, list);
        container.append(section);
    });
}

export function renderStandings(tableBody, teams) {
    tableBody.replaceChildren();

    if (teams.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 9;
        cell.className = "empty-state";
        cell.textContent = "Команда не найдена";
        row.append(cell);
        tableBody.append(row);
        return;
    }

    teams.forEach((team) => {
        const row = document.createElement("tr");
        const values = [team.position, team.games, team.wins, team.draws, team.losses, team.goals];

        const position = document.createElement("td");
        position.className = "position";
        position.textContent = values.shift();

        const teamCell = document.createElement("td");
        const teamName = document.createElement("span");
        teamName.className = "table-team";
        teamName.append(createTeamBadge(team), team.name);
        teamCell.append(teamName);

        row.append(position, teamCell);

        values.forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.append(cell);
        });

        const formCell = document.createElement("td");
        const form = document.createElement("span");
        form.className = "form";

        team.form.forEach((result) => {
            const item = document.createElement("span");
            item.className = "form__item";
            item.textContent = result === "W" ? "В" : result === "D" ? "Н" : "П";

            if (result === "D") item.classList.add("form__item--draw");
            if (result === "L") item.classList.add("form__item--loss");
            form.append(item);
        });

        formCell.append(form);

        const points = document.createElement("td");
        const pointsValue = document.createElement("strong");
        pointsValue.textContent = team.points;
        points.append(pointsValue);

        row.append(formCell, points);
        tableBody.append(row);
    });
}

export function renderPlayers(container, playerItems) {
    container.replaceChildren();

    if (playerItems.length === 0) {
        const message = document.createElement("p");
        message.className = "card empty-state";
        message.textContent = "Игрок не найден";
        container.append(message);
        return;
    }

    playerItems.forEach((player) => {
        const card = document.createElement("article");
        card.className = "player-card";

        const photo = document.createElement("div");
        photo.className = `player-card__photo player-card__photo--${player.imageClass}`;
        const number = document.createElement("span");
        number.className = "player-card__number";
        number.textContent = player.number;
        photo.append(number);

        const content = document.createElement("div");
        content.className = "player-card__content";
        const name = document.createElement("h2");
        name.className = "player-card__name";
        name.textContent = player.name;
        const club = document.createElement("p");
        club.className = "player-card__club";
        club.textContent = `${player.club} · ${player.position}`;

        const stats = document.createElement("div");
        stats.className = "player-card__stats";

        [
            [player.matches, "Матчи"],
            [player.goals, "Голы"],
            [player.assists, "Передачи"],
        ].forEach(([value, label]) => {
            const stat = document.createElement("div");
            stat.className = "player-card__stat";
            const statValue = document.createElement("strong");
            statValue.className = "player-card__value";
            statValue.textContent = value;
            const statLabel = document.createElement("span");
            statLabel.className = "player-card__label";
            statLabel.textContent = label;
            stat.append(statValue, statLabel);
            stats.append(stat);
        });

        content.append(name, club, stats);
        card.append(photo, content);
        container.append(card);
    });
}

export function renderTimeline(container, events) {
    container.replaceChildren();

    events.forEach((event) => {
        const item = document.createElement("li");
        item.className = "timeline__item";

        const minute = document.createElement("span");
        minute.className = "timeline__minute";
        minute.textContent = event.minute;

        const description = document.createElement("p");
        description.className = "timeline__event";
        const title = document.createElement("strong");
        title.textContent = event.title;
        description.append(title, ` ${event.description}`);

        item.append(minute, description);
        container.append(item);
    });
}
