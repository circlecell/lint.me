if [ "$TRAVIS_PULL_REQUEST" == "false" ]
then
    if [ "$TRAVIS_BRANCH" == "master" ] || [ "$TRAVIS_BRANCH" == "stage" ]
        then
            semantic-release pre &&
            git stash &&
            pm2 deploy ecosystem.json $TRAVIS_BRANCH &&
            git stash apply --index &&
            semantic-release post
    fi;
fi;
